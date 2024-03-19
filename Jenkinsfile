pipeline {
    agent any

    stages {
        stage('Build Frontend') {
            steps {
                // Checkout frontend repository
                git branch: 'main', url: 'https://github.com/pveerrotwal/ToDoFastAPI-Frontend.git'

                // Build frontend Docker image
                script {
                    echo "Building the image"
                }
            }
        }
        stage('Deploy Frontend') {
            steps {
                // Deploy frontend Docker containers using docker-compose-frontend.yml
                sh 'docker-compose -f docker-compose-frontend.yml up -d'
            }
        }
        stage('Horusec Scan') {
            steps {
                // Install Horusec and run the security scan
                sh 'curl -fsSL https://raw.githubusercontent.com/ZupIT/horusec/main/deployments/scripts/install.sh | bash -s latest'
                sh 'horusec start -p="./" -a 5446311c-5829-4e6b-924b-977250c36ec7 --disable-docker="true"'
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
