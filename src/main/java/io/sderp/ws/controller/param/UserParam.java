package io.sderp.ws.controller.param;

import io.sderp.ws.model.Platform;
import io.sderp.ws.model.Role;
import io.sderp.ws.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserParam {
    private User user;
    private Role role;
    private List<Platform> platform;
}
