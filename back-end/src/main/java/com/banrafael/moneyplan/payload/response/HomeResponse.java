package com.banrafael.moneyplan.payload.response;

import com.banrafael.moneyplan.model.Application;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor

public class HomeResponse {
    private String jobCount;
    private String userCount;
    private String recruiterCount;
    private List<ApplicationsResponse> applicationsResponseList;

    public HomeResponse(String jobCount, String userCount, String recruiterCount, List<ApplicationsResponse> applicationsResponseList) {
        this.jobCount = jobCount;
        this.userCount = userCount;
        this.recruiterCount = recruiterCount;
        this.applicationsResponseList = applicationsResponseList;
    }
}