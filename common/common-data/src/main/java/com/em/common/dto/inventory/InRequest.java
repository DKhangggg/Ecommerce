package com.em.common.dto.inventory;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InRequest {
    private String productId;
    private String sellerId;
    private int quantity;
    private String location;
}

