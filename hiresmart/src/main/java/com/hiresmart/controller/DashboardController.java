package com.hiresmart.controller;

import com.hiresmart.dto.DashboardStats;
import com.hiresmart.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public DashboardStats stats(){
        return dashboardService.getStats();
    }
}