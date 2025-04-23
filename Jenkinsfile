pipeline {
    agent any

    environment {
        IMAGE_NAME = 'pavan1833/n-visulizer_v1'
        IMAGE_TAG = 'v1'
        CONTAINER_NAME = 'n-queen-visulizer'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/Avulakarthik18/N-queen-Visulizer.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image using cache..."
                bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG% ."
            }
        }

        stage('Cleanup Existing Container') {
            steps {
                bat """
                for /f %%i in ('docker ps -a -q --filter "name=%CONTAINER_NAME%"') do (
                    docker stop %%i
                    docker rm %%i
                )
                """
            }
        }

        stage('Run New Container') {
            steps {
                bat "docker run -d -p 8003:8080 --name %CONTAINER_NAME% %IMAGE_NAME%:%IMAGE_TAG%"
            }
        }
    }
}
