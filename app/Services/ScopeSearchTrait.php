<?php

namespace App\Services;

trait ScopeSearchTrait
{
    /**
     * @param array $values         查找的关键字
     * @param array $fields,        在哪些字段内进行搜索[如果字段太长或者text字段不建议使用本方法]
     * @param bool|false $fuzzy,    是否模糊匹配
     * @param bool|true $and        与还是或
     * @return mixed
     *
     * 如果在多个字段内搜索某个关键字, 则多个字段间都是按或组合条件
     * 即指定关键字在给出的字段, 任意有一个字段能匹配则该关键字匹配
     * 调用方法
     * search($values, $fields, $fuzzy, $and)
     */
    public function scopeSearch($query, $values = [], $fields = [], $fuzzy = false, $and = true) {
        if ($and) {
            return $query->searchAnd($values, $fields, $fuzzy);
        } else {
            return $query->searchOr($values, $fields, $fuzzy);
        }
    }

    /**
     * @param array $values
     * @param array $fields
     * @param bool|false $fuzzy
     * @return mixed
     * 例如按["Po", "on"]与搜索["nickname"], 则nickname无匹配, 无大小写
     * 如果fuzzy=true, 则nickname只需包含有则匹配, 例如, Poo, ooN
     * 调用方法
     * searchAnd($values, $fields, $fuzzy)
     * 当$values有多个关键字时, 全部关键字都能(在任意给出的字段中)找到匹配
     */
    public function scopeSearchAnd($query, $values = [], $fields = [], $fuzzy = false) {
        return $query->where(function($query) use($fields, $values, $fuzzy){
            foreach ($values    as  $k  =>  $value) {
                $query->where(function($query) use($fields, $value, $fuzzy){
                    foreach ($fields    as  $i  =>  $field) {
                        if (! $fuzzy) {
                            $query->orWhere($field, $value);
                        } else {
                            $query->orWhereRaw("instr(`{$field}`, \"{$value}\") > 0");
                        }
                    }
                });
            }
        });
    }

    /**
     * @param $query
     * @param array $values
     * @param array $fields
     * @param bool|false $fuzzy
     * @return mixed
     * 调用方法
     * searchOr($values, $fields, $fuzzy)
     * 当$values有多个关键字时, 任意有一个关键字能找到匹配
     */
    public function scopeSearchOr($query, $values = [], $fields = [], $fuzzy = false) {
        return $query->where(function($query) use($fields, $values, $fuzzy){
            foreach ($values    as  $k  =>  $value) {
                $query->orWhere(function($query) use($fields, $value, $fuzzy){
                    foreach ($fields    as  $i  =>  $field) {
                        if (! $fuzzy) {
                            $query->orWhere($field, $value);
                        } else {
                            $query->orWhereRaw("instr(`{$field}`, \"{$value}\") > 0");
                        }
                    }
                });
            }
        });
    }
}