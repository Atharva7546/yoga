# Use the official MySQL image as the base
FROM mysql:latest

# Set environment variables for MySQL configuration
ENV MYSQL_ROOT_PASSWORD=
ENV MYSQL_DATABASE=flexmoney
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=

# Copy SQL scripts or dump files to initialize the database
COPY flexmoney.sql /docker-entrypoint-initdb.d/


# Expose the default MySQL port
EXPOSE 3306