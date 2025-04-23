pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-web-app'  // Name of the Docker image
        DOCKER_PORT = '8080'         // Port to expose the app
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the GitHub repository
                git 'https://github.com/Karthik123467/N-queen-visulizer.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Stop any running container of the same image (if exists)
                    sh 'docker ps -q --filter "name=${DOCKER_IMAGE}" | xargs -I {} docker stop {}'
                    
                    // Remove the old container (if exists)
                    sh 'docker ps -a -q --filter "name=${DOCKER_IMAGE}" | xargs -I {} docker rm {}'
                    
                    // Run the Docker container on the specified port
                    sh 'docker run -d -p ${DOCKER_PORT}:80 ${DOCKER_IMAGE}'
                }
            }
        }
    }

    post {
        always {
            // Clean up after the build (stop and remove any containers)
            sh 'docker ps -a -q --filter "name=${DOCKER_IMAGE}" | xargs -I {} docker rm -f {}'
        }
    }
}
