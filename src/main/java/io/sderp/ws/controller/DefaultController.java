package io.sderp.ws.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DefaultController {
    @RequestMapping({"/", "/home", "/management/**", "/report/**"})
    public String getUIResource() {
        return "forward:/index.html";
    }
}
