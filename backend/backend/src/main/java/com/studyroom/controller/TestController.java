package com.studyroom.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * 测试接口（验证项目启动）
 */
@RestController
public class TestController {

    @GetMapping("/test")
    public Map<String, Object> test() {
        Map<String, Object> result = new HashMap<>();
        result.put("code", 200);
        result.put("msg", "后端项目启动成功！");
        result.put("data", "自习室预约系统后端正常运行");
        return result;
    }
}