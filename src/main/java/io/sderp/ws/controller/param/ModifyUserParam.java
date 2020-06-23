package io.sderp.ws.controller.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class ModifyUserParam {
    @NonNull
    private String userId;
    private String userPwd;
    private String userRoleId;
    private List<String> userPlatformIdList;
}
