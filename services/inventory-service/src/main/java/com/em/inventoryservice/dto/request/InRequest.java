package com.em.inventoryservice.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class InRequest {
    private String productId;
    private String sellerId;
    private int quantity;
    private String location;
}
