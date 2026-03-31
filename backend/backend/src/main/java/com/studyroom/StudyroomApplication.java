package com.studyroom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 自习室预约系统后端启动类
 */
@SpringBootApplication
public class StudyroomApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudyroomApplication.class, args);
        System.out.println("=====================================");
        System.out.println("  自习室预约系统后端启动成功！");
        System.out.println("  访问地址：http://localhost:8080/test");
        System.out.println("=====================================");
    }

}