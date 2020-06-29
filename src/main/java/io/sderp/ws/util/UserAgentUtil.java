package io.sderp.ws.util;

public class UserAgentUtil {
    public static String getBrowser(String userAgent) {
        String brower = null;
        if (userAgent.contains("Trident")) brower = "MSIE";
        else if (userAgent.contains("Chrome")) brower = "Chrome";
        else if (userAgent.contains("Opera")) brower = "Opera";
        else if (userAgent.contains("iPhone") && userAgent.contains("Mobile")) brower = "iPhone";
        else if (userAgent.contains("Android") && userAgent.contains("Mobile")) brower = "Android";

        return brower;
    }

    public static String getOS(String userAgent) {
        String os = null;

        if(userAgent.contains("NT 6.0")) os = "Windows Vista/Server 2008";
        else if(userAgent.contains("NT 5.2")) os = "Windows Server 2003";
        else if(userAgent.contains("NT 5.1")) os = "Windows XP";
        else if(userAgent.contains("NT 5.0")) os = "Windows 2000";
        else if(userAgent.contains("NT")) os = "Windows NT";
        else if(userAgent.contains("9x 4.90")) os = "Windows Me";
        else if(userAgent.contains("98")) os = "Windows 98";
        else if(userAgent.contains("95")) os = "Windows 95";
        else if(userAgent.contains("Win16")) os = "Windows 3.x";
        else if(userAgent.contains("Windows")) os = "Windows";
        else if(userAgent.contains("Linux")) os = "Linux";
        else if(userAgent.contains("Macintosh")) os = "Macintosh";

        return os;
    }
}
