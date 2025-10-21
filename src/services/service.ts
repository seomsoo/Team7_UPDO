import HttpClient from './httpClient';

export default abstract class Service {
  protected http = HttpClient.getInstance();
}
