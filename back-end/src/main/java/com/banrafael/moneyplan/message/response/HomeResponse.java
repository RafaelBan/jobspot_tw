package com.banrafael.moneyplan.message.response;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter

public class HomeResponse {
    private String jobOpenings;
    private String normalUserCount;
    private String recruiterUserCount;

    public HomeResponse(String jobOpenings, String normalUserCount, String recruiterUserCount) {
        this.jobOpenings = jobOpenings;
        this.normalUserCount = normalUserCount;
        this.recruiterUserCount = recruiterUserCount;
    }
}
