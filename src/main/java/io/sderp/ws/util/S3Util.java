package io.sderp.ws.util;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CopyObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

public class S3Util {
	private static final String ACCESS_KEY = "AKIAXKNSETLAXA7UXMX3";
	private static final String SECRET_ACCESS_KEY = "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";
	private static final Region REGION = Region.AP_NORTHEAST_2;
	private static final String BUCKET_NAME = "sindh.erp";
	private static AwsCredentialsProvider awsCredentialsProvider = StaticCredentialsProvider.create(AwsBasicCredentials.create(ACCESS_KEY, SECRET_ACCESS_KEY));
    private static S3Client s3 = S3Client.builder().credentialsProvider(awsCredentialsProvider).region(REGION).build();

    public S3Util() {}
    
    public static String upload(String fileKey, MultipartFile file) throws Exception {
    	if (fileKey == null || file == null) return null;
    	
    	String fileContentType = file.getContentType();
    	long fileSize = file.getSize();
    	
		s3.putObject(
			PutObjectRequest.builder()
			.bucket(BUCKET_NAME)
			.key(fileKey)
			.contentType(fileContentType)
			.build(),
			RequestBody.fromInputStream(file.getInputStream(), fileSize)
		);
			
		
		return fileKey;
    }
    
    public static Resource download(String fileKey) throws IOException {
    	if (fileKey == null || fileKey == null) return null;
    	
    	Resource resource = new InputStreamResource(
			s3.getObject(
				GetObjectRequest.builder()
				.bucket(BUCKET_NAME)
				.key(fileKey)
				.build(),
				ResponseTransformer.toInputStream()
			)
		);
        
		return resource;
        
	}
    
    public static String copy(String fromFileKey, String toFileKey) throws IOException {
    	if (fromFileKey == null || fromFileKey == null) return null;
    	if (toFileKey == null || toFileKey == null) return null;
    	
    	String fromObjectUrl = URLEncoder.encode(BUCKET_NAME + "/" + fromFileKey, StandardCharsets.UTF_8.toString());
    	
    	s3.copyObject(
    		CopyObjectRequest.builder()
    		.copySource(fromObjectUrl)
    		.destinationBucket(BUCKET_NAME)
    		.destinationKey(toFileKey)
    		.build()
    	);
    	
    	return toFileKey;
    }
    
    public static void test() throws Exception {
    	String fileKey = "reports/platform-id/sindh.erp.s3_credentials-1.csv";
    	String toFileKey = "reports/platform-id/sindh.erp.s3_credentials-3.csv";
    	MultipartFile file = null;

    	File inFile = new File("/Users/nemoo/Downloads/sindh.erp.s3_credentials.csv");
    	FileItem fileItem = new DiskFileItem("file", Files.probeContentType(inFile.toPath()), false, inFile.getName(), (int) inFile.length(), inFile.getParentFile());

    	try {
    		InputStream input = new FileInputStream(inFile);
    	    OutputStream os = fileItem.getOutputStream();
    	    IOUtils.copy(input, os);
    	} catch (Exception e) {
    	    throw new IllegalArgumentException("Invalid file: " + e, e);
    	}

    	file = new CommonsMultipartFile(fileItem);

    	try {
    		// file upload to amazon s3
			S3Util.upload(fileKey, file);

			// file download from amazon s3
			Resource resource = S3Util.download(fileKey);

			// save file to file system
			InputStream inputStream = resource.getInputStream();
			File outFile = new File("/Users/nemoo/Downloads/out-1.csv");
			OutputStream outputStream = new FileOutputStream(outFile);
			IOUtils.copy(inputStream, outputStream);

			outputStream.close();

			S3Util.copy(fileKey, toFileKey);

		} catch (Exception e) {
			e.printStackTrace();
		}
    }
}

