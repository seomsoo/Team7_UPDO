import HttpClient from './HttpClient';
import PolymorphicHttpClient from './PolymorphicHttpClient';

export default abstract class Service {
  protected http = HttpClient.getInstance();
}

export abstract class ApiRouteService {
  protected http = PolymorphicHttpClient.getInstance();
}
