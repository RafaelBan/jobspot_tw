package com.banrafael.moneyplan.payload.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class UserRequest {
    private String username;

    private String email;

    private String lastName;

    private String firstName;
}
