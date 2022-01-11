package com.banrafael.moneyplan.payload.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class JwtResponse {
  private String token;
  private String firstName;
  private String username;
  private String role;

  public JwtResponse(String accessToken, String username, String firstName, String role) {
    this.token = accessToken;
    this.username = username;
    this.firstName = firstName;
    this.role = role;
  }
}
