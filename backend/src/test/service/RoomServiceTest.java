package com.mango.service;

import com.mango.mapper.RoomMapper;
import com.mango.pojo.Room;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class RoomServiceTest {

    @Mock
    private RoomMapper roomMapper;

    @InjectMocks
    private RoomServiceImpl roomService;

    @Test
    void testGetAllRooms() {
        when(roomMapper.findAll()).thenReturn(List.of(new Room(), new Room()));
        assertEquals(2, roomService.getAllRooms().size());
    }

    @Test
    void testGetRoomById() {
        Room room = new Room();
        room.setId(1);
        when(roomMapper.findById(1)).thenReturn(room);
        assertEquals(1, roomService.getRoomById(1).getId());
    }
}