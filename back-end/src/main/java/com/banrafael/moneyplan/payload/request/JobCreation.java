package com.banrafael.moneyplan.payload.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor

public class JobCreation {
    private String username;
    private String title;
    private String description;
    private String tags;
    private String location;
    private String status;
}
