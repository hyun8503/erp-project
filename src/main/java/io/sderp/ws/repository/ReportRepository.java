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

    public int insertReportHistory(String userId, String reportId) { return reportMapper.insertReportHistory(userId, reportId); }
    public int updateReport(Report report) { return reportMapper.updateReport(report); }
    public int deleteReport(String reportId) { return reportMapper.deleteReport(reportId); }
    public int deleteReportByTemplateId(String templateId) { return reportMapper.deleteReportByTemplateId(templateId); }
    
    public List<Report> selectAllReport(String platformId, String reportName) { return reportMapper.selectAllReport(platformId, reportName); }
    public List<Report> selectAllByTemplateId(String templateId) { return reportMapper.selectAllByTemplateId(templateId); }
    public List<Report> selectReport(String userId, String reportMonth, String platformId, String reportName) { return reportMapper.selectReport(userId, reportMonth, platformId, reportName); }
    public Report selectReportByReportId(String reportId) { return reportMapper.selectReportByReportId(reportId); }
}
