package com.nullobject.demo.test.impl;

import com.nullobject.demo.test.Action;
import com.nullobject.demo.test.Parser;

public class MyParser implements Parser {
    private static Action DO_NOTHING = new Action() {
        public void doSomething() { /* do nothing */ }
    };

    @Override
    public Action findAction(String userInput) {
        return null;
    }
}
