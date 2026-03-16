
package com.crimeportal.repository;

import com.crimeportal.model.CrimeReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrimeRepository extends JpaRepository<CrimeReport,Long>{}
