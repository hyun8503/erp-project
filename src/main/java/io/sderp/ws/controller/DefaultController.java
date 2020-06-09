package io.sderp.ws.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DefaultController {
    @RequestMapping({"/", "/home"})
    public String getUIResource() {
        return "forward:/index.html";
    }
}
