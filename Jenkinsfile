pipeline {
    agent any

    stages {
        stage('Build Frontend') {
            steps {
                // Checkout frontend repository
                git branch: 'main', url: 'https://github.com/pveerrotwal/ToDoFastAPI-Frontend.git'

                // Build frontend Docker image
                script {
                    docker.build('frontend', '-f Dockerfile .')
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                // Deploy frontend Docker containers using docker-compose-frontend.yml
                sh 'docker-compose -f docker-compose-frontend.yml up -d'
            }
        }
    }

    post {
        always {
            // Clean up Docker resources
            sh 'docker-compose -f docker-compose-frontend.yml down'
        }
    }
}
