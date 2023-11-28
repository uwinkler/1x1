package dr.winkler.mal1;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;

public class ResponseTimeInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(ResponseTimeInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        request.setAttribute("startTime", System.currentTimeMillis());
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        // Calculate and log the response time
        long startTime = (long) request.getAttribute("startTime");
        long endTime = System.currentTimeMillis();
        long responseTime = endTime - startTime;

        logger.info("Request URL: {}, Response Time: {} ms", request.getRequestURI(), responseTime);
    }
}
