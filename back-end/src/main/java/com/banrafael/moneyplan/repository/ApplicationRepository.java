package com.banrafael.moneyplan.repository;

import com.banrafael.moneyplan.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUserId(int id);
    List<Application> findByJobId(int id);
    boolean existsByJobIdAndUserId(int jobId, int userId);
}
