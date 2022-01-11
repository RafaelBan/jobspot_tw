package com.banrafael.moneyplan.payload.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class ApplicationInformationResponse {
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String title;
    private String location;
    private String description;

    public ApplicationInformationResponse(String userId, String firstName, String lastName, String email, String title, String location, String description) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.title = title;
        this.location = location;
        this.description = description;
    }
}
