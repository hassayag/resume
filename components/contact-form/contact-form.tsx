import { Email } from '@mui/icons-material';
import commonStyles from '../common.module.sass';
import styles from './contact-form.module.sass';

const ACCESS_KEY = '29701a2f-59c8-43b1-9c23-b9d2acdb5845';
export const ContactForm = () => {
    return (
        <div className={styles.contactSection}>
            <div className={styles.contactItems}>
                <div className={[styles.item, commonStyles.link].join(' ')}>
                    <Email style={{ position: 'relative', bottom: 2, color: '#7c558c' }} />
                    <div>
                        <a href="mailto:haassayag@gmail.com">haassayag@gmail.com</a>
                    </div>
                </div>

                <a
                    className={[styles.item, commonStyles.link].join(' ')}
                    href="https://uk.linkedin.com/in/harryassayag"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        style={{ width: 20, position: 'relative', bottom: 2 }}
                        src="/linkedin-blue.svg"
                        alt="linkedin"
                    />
                    <span>harryassayag</span>
                </a>
            </div>

            <form className={styles.contactForm} action="https://api.web3forms.com/submit" method="POST">
                <input type="hidden" name="access_key" value={ACCESS_KEY} />
                <input type="hidden" name="subject" value="New Contact Form Submission from Web3Forms" />
                <input type="hidden" name="from_name" value="hassayag.dev" />

                <div className={styles.formGroupContainer}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.formLabel}>
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            className={styles.formInput}
                            placeholder="Your name"
                            type="text"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            className={styles.formInput}
                            placeholder="Your email"
                            type="email"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.formLabel}>
                            Phone
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            className={styles.formInput}
                            placeholder="Your phone number"
                            type="text"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message" className={styles.formLabel}>
                            Message
                        </label>
                        <textarea
                            className={styles.formTextarea}
                            id="message"
                            name="message"
                            placeholder="Insert thrilling opportunity, question, or hot take"
                            required
                        ></textarea>
                    </div>
                </div>
                <button className={styles.formSubmit} type="submit">
                    Send Message
                </button>
            </form>
        </div>
    );
};
