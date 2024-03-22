pipeline {
    agent any

    stages {
        stage('Build Frontend') {
            steps {
                // Checkout backend repository
                git branch: 'main', url: 'https://github.com/pveerrotwal/ToDoFastAPI-Frontend.git'

                // Build backend Docker image
                script {
                    echo "Building Frontend"
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                // Deploy backend Docker containers using docker-compose-backend.yml
                sh 'docker-compose -f docker-compose-frontend.yml up -d'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Execute SonarQube Scanner
                script {
                    // Get the path to SonarQube Scanner installation directory
                    def scannerHome = tool 'SonarQubeScanner';
                    echo "SonarQube Scanner installation directory: ${scannerHome}"
                    
                    // Run SonarQube Scanner
                    withSonarQubeEnv('SonarQubeServer') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
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
