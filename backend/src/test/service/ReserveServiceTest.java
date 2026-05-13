package com.mango.service;

import com.mango.mapper.ReserveMapper;
import com.mango.pojo.Reserve;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class ReserveServiceTest {

    @Mock
    private ReserveMapper reserveMapper;

    @InjectMocks
    private ReserveServiceImpl reserveService;

    @Test
    void testAddReserve() {
        Reserve reserve = new Reserve();
        reserve.setId(10);
        when(reserveMapper.insert(any())).thenReturn(1);
        assertEquals(1, reserveService.addReserve(reserve));
    }

    @Test
    void testFindByUserId() {
        when(reserveMapper.findByUserId(1)).thenReturn(List.of(new Reserve()));
        assertFalse(reserveService.findByUserId(1).isEmpty());
    }

    @Test
    void testDeleteReserve() {
        doNothing().when(reserveMapper).deleteById(1);
        reserveService.deleteReserve(1);
        verify(reserveMapper, times(1)).deleteById(1);
    }
}