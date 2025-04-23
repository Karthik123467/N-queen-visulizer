pipeline {
    agent any

    environment {
        IMAGE_NAME = "mywebapp"
        CONTAINER_NAME = "mywebapp-container"
        PORT = "88"
        HOST_PORT = "88"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-username/your-repo-name.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $IMAGE_NAME ."
                }
            }
        }

        stage('Stop and Remove Old Container') {
            steps {
                script {
                    sh """
                        docker stop $CONTAINER_NAME || true
                        docker rm $CONTAINER_NAME || true
                    """
                }
            }
        }

        stage('Run New Container') {
            steps {
                script {
                    sh "docker run -d --name $CONTAINER_NAME -p $HOST_PORT:89 $IMAGE_NAME"
                }
            }
        }
    }
}
