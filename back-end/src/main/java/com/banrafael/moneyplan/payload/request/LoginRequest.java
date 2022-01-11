package com.banrafael.moneyplan.payload.request;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor

public class LoginRequest {
	@NotBlank
  private String username;

	@NotBlank
	private String password;
}
