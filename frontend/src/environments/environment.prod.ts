// Production environment used inside the Docker container
// The frontend runs in its own container and communicates with the
// backend service via the Docker network.  Using "localhost" here would
// resolve to the nginx container itself, so we point to the "backend"
// service name defined in docker-compose instead.
export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000',
};
