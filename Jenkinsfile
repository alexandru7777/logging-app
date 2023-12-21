pipeline {
    agent any

    // environment {
    //     // Retrieve environment variables from Jenkins credentials
    //     MY_SECRET_ENV = credentials('fa1f03b2-68c2-4904-81e5-468d93482f2f')
    // }

    stages {
        stage('Checkout') {
            steps {
                // Check out the source code from the repository
                checkout scm
            }
        }
        stage('Build and Deploy') {
            steps {
                script {
                    dir('logging-app') {
                 // Load environment variables from the credentials
                    // sh 'echo $MY_SECRET_ENV > .env'

                    
                    // Build and deploy using Docker Compose
                    sh 'ansible-playbook -i inventory.ini deploy.yml'
                    }

                }
            }
        }
    }

}