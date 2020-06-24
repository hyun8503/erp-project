package io.sderp.ws.repository;

import io.sderp.ws.model.Report;
import io.sderp.ws.repository.mapper.ReportMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReportRepository {
    private ReportMapper reportMapper;

    @Autowired
    public ReportRepository(ReportMapper reportMapper) {
        this.reportMapper = reportMapper;
    }

    public List<Report> selectAllReport(String platformId, String reportName) { return reportMapper.selectAllReport(platformId, reportName); }
    public List<Report> selectReport(String userId, String reportMonth, String platformId, String reportName) { return reportMapper.selectReport(userId, reportMonth, platformId, reportName); }
    public Report selectReportByReportId(String reportId) { return reportMapper.selectReportByReportId(reportId); }
}
