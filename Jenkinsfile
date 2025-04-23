pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-web-app'
        DOCKER_PORT = '8088'
    }

    stages {
        stage('Checkout Repository') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/Karthik123467/N-queen-visulizer.git'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker ps -q --filter "name=${DOCKER_IMAGE}" | xargs -I {} docker stop {} || true'
                    sh 'docker ps -a -q --filter "name=${DOCKER_IMAGE}" | xargs -I {} docker rm {} || true'
                    sh 'docker run -d -p ${DOCKER_PORT}:80 ${DOCKER_IMAGE}'
                }
            }
        }
    }

    post {
        always {
            sh 'docker ps -a -q --filter "name=${DOCKER_IMAGE}" | xargs -I {} docker rm -f {} || true'
        }
    }
}
