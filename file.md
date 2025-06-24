### Secret in THe Shadows
You’ve inherited a small C program that reads in a secret from a file and allows users to input data in an attempt to match it. If the user input matches the secret, the program prints a celebratory message. Sounds simple... maybe too simple.

Although the program appears to work under normal conditions, there's a subtle bug lurking in the shadows—one that could cause it to behave unpredictably, even dangerously. 

## Tasks Objective
Your mission is to analyze the code and identify the most critical issue affecting its security.

## Delivery
Write a report detailing your findings, also highlight the work performed and the methods used.

**Make sure to packedge your report into a PDF file and submit it over email with the other chanllenges.**

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *secret_buffer;

void *secure_alloc(size_t size) {
    if (size > 1024) {                    
        printf("Allocation too large.\n");
        return NULL;
    }
    void *ptr = malloc(size + 1);
    if (!ptr) {
        perror("malloc");
        exit(1);
    }
    ((char *)ptr)[size] = '\0';
    return ptr;
}

void get_input() {
    size_t len;
    printf("Length: ");
    if (scanf("%zu", &len) != 1) return; 

    int newline;
    while ((newline = getchar()) != '\n' && newline != EOF);

    char *data = secure_alloc(len);
    if (!data) return;

    printf("Input: ");
    int ch;
    int i = 0;
    while ((ch = getchar()) != '\n' && ch != EOF && i < len) {  
    	data[i++] = ch;
    }

    printf("You entered: %s\n", data);
    if(secret_buffer){
        if(strcmp(secret_buffer, data) == 0){
            printf("You win\n");
        }
    }
    free(data);
}

void load_secret(){
    FILE *file = fopen("secret.txt", "r");
    if (!file) {
        perror("fopen");
        return;
    }
    secret_buffer = malloc(32);
    fgets(secret_buffer, 32, file);
    fclose(file);
}

void unload_secret(){
    if(secret_buffer){
        free(secret_buffer);
        secret_buffer = NULL; 
    }
}

int main() {
    int choice;
    while(1) {
        printf("1. load secret\n2. delete secret\n3. get input\n4. Quit\n> ");
        if (scanf("%d", &choice) != 1) break;
            switch (choice) {
                case 1: load_secret(); break;
                case 2: unload_secret(); break;
                case 3: get_input(); break;
                default: return 0;
            }
        }
    return 0;
}

```