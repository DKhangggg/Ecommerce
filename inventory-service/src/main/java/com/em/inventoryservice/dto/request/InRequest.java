package com.em.inventoryservice.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class InRequest {
    private UUID productId;
    private int quantity;
    private String location;

}
