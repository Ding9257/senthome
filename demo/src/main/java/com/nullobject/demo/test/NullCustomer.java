package com.nullobject.demo.test;

public class NullCustomer extends AbstractCustomer {
    @Override
    public boolean isNil() {
        return false;
    }

    @Override
    public String getName() {
        return "在客户数据库中不可用";
    }
}
