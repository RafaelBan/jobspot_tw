package com.banrafael.moneyplan.repository;

import com.banrafael.moneyplan.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    @Query(value = "SELECT COUNT(ALL u.role_id) FROM UserRole u WHERE u.role_id = ?1")
    long countAllByRoleId(int role_id);
    @Query(value = "SELECT u FROM UserRole u WHERE u.user_id = ?1")
    UserRole findByUserId(int id);
}
