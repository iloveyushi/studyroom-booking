package com.mango.service;

import com.mango.dao.UserMapper;
import com.mango.pojo.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private com.mango.service.impl.AuthServiceImpl authService;

    // 测试1：登录成功
    @Test
    void testLoginSuccess() {
        User mockUser = new User();
        mockUser.setUsername("admin");
        mockUser.setPassword("123456");
        when(userMapper.selectByUsername("admin")).thenReturn(mockUser);

        User result = authService.login("admin", "123456");
        assertNotNull(result);
        assertEquals("admin", result.getUsername());
    }

    // 测试2：密码错误
    @Test
    void testLoginWrongPassword() {
        User mockUser = new User();
        mockUser.setPassword("123456");
        when(userMapper.selectByUsername("admin")).thenReturn(mockUser);

        assertThrows(RuntimeException.class, () -> {
            authService.login("admin", "wrongpass");
        });
    }
}