
package com.crimeportal.repository;

import com.crimeportal.model.CaseRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaseRepository extends JpaRepository<CaseRecord,Long>{}
