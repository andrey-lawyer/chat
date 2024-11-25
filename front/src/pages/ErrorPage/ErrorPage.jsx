import styles from './ErrorPage.module.css';

export const ErrorPage = () => {
    return (
        <section className={styles.errorPage}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p>
                <a href="/">Go back to the main page</a>
            </p>
        </section>
    );
};