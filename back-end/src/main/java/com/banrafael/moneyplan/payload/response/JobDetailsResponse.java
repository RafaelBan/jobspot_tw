package com.banrafael.moneyplan.payload.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class JobDetailsResponse {
    private String id;
    private String userId;
    private String name;
    private String email;
    private String cvPath;
    private String status;

    public JobDetailsResponse(String id, String userId, String name, String email, String cvPath, String status) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.cvPath = cvPath;
        this.status = status;
    }
}
