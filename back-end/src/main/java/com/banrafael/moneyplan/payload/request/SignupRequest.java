package com.banrafael.moneyplan.payload.request;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor

public class SignupRequest {
  @NotBlank
  @Size(min = 3, max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  private Set<String> role;

  @NotBlank
  @Size(min = 6, max = 40)
  private String password;

  @NotBlank
  private String lastName;

  @NotBlank
  private String firstName;

}
