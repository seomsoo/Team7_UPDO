import HttpClient from './httpClient';
import PolymorphicHttpClient from './polymorphicHttpClient';

export default abstract class Service {
  protected http = HttpClient.getInstance();
}

export abstract class ApiRouteService {
  protected http = PolymorphicHttpClient.getInstance();
}
