package com.banrafael.moneyplan.repository;

import java.util.Optional;

import com.banrafael.moneyplan.model.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.banrafael.moneyplan.model.ERole;
import com.banrafael.moneyplan.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
