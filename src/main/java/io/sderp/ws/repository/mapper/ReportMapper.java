package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.Report;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportMapper {
    List<Report> selectAllReport(@Param("platformId") String platformId, @Param("reportName") String reportName);
    List<Report> selectReport(@Param("userId") String userId, @Param("reportMonth") String reportMonth, @Param("platformId") String platformId, @Param("reportName") String reportName);
    Report selectReportByReportId(String reportId);
}
